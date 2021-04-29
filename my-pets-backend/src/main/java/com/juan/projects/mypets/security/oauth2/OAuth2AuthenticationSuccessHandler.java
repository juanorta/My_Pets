package com.juan.projects.mypets.security.oauth2;

import com.juan.projects.mypets.config.AppProperties;
import com.juan.projects.mypets.exception.BadRequestException;
import com.juan.projects.mypets.security.UserPrincipal;
import com.juan.projects.mypets.util.CookieUtils;
import com.juan.projects.mypets.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
   private TokenProvider tokenProvider;
   private AppProperties appProperties;
   private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

   @Autowired
    OAuth2AuthenticationSuccessHandler(TokenProvider tokenProvider, AppProperties appProperties, HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository){
       this.tokenProvider = tokenProvider;
       this.appProperties = appProperties;
       this.httpCookieOAuth2AuthorizationRequestRepository = httpCookieOAuth2AuthorizationRequestRepository;
   }

   @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException{
       String targetUrl = determineTargetUrl(request, response, authentication);

       if(response.isCommitted()){
           logger.debug("Response has already been commited. Unable to redirect to " + targetUrl);
           return;
       }

       clearAuthenticationAttributes(request, response);
       getRedirectStrategy().sendRedirect(request, response, targetUrl);

   }

   protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication){
       Optional<String> redirectUri = CookieUtils.getCookie(request, HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
               .map(Cookie::getValue);

       System.out.println("REDIRECT URI!!");
       System.out.println(redirectUri);
       if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())){
           throw new BadRequestException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
       }

       String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

       System.out.println("AUTHENTICATION");
       System.out.println(authentication.getCredentials().toString());
//    authentication = SecurityContextHolder.getContext().getAuthentication();
//        String name = authentication.getName();
//       System.out.println(authentication.get);
//       UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
//       System.out.println(user.getEmail());

       String token = tokenProvider.createToken(authentication);




       System.out.println(appProperties.toString());
       System.out.println(UriComponentsBuilder.fromUriString(targetUrl).queryParam("token", token).build().toUriString());
       return UriComponentsBuilder.fromUriString(targetUrl)
               .queryParam("token", token)
               .build().toUriString();
   }

   protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response){
       super.clearAuthenticationAttributes(request);
       httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
   }

   private boolean isAuthorizedRedirectUri(String uri){
       URI clientRedirectUri = URI.create(uri);

       return appProperties.getOauth2().getAuthorizedRedirectUris()
               .stream()
               .anyMatch(authorizedRedirectUri ->{
                   URI authorizedURI = URI.create(authorizedRedirectUri);
                   if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost()) && authorizedURI.getPort() == clientRedirectUri.getPort()){
                       return true;
                   }
                   return false;
               });
   }
}
