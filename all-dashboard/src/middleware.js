import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";


export function middleware(request, ev) {
  // mehul
  // console.log('request.nextUrl.pathname', request.nextUrl.pathname);
  // if (!request.cookies.get("accessToken")?.value) {
  //     console.log('------', request.cookies.get("accessToken")?.value)
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/signin";
  //     return NextResponse.redirect(url, request.url);
  // }

  //**SRI**
  let USER_ROLE_ADMIN = 1
  let USER_ROLE_HOST = 5
  let USER_ROLE_CO_HOST = 6
  let USER_ROLE_CUSTOMER = 10

  let url  = request.nextUrl.clone();
  const signInUrl = '/accounts/signin'
  const notFoundPageUrl = '/accounts/404'

  function redirectToSignIn( req ){
    url.pathname = '/accounts/signin'
    return NextResponse.redirect( url, req.url )
  }

  function redirectTo404( req ) {
    url.pathname = '/accounts/404'
    return NextResponse.redirect( url, req.url )
  }

  function isTokenValid(tokenExp) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp <= tokenExp;
  }

  try { 
       const  accessToken = request.cookies.get('accessToken')?.value;
      if ( !request.cookies.get('accessToken')?.value ) {
        // console.log('cookie not founc', accessToken)
        // return redirectToSignIn( request )
      }
      else {
        const decryptData = jwtDecode(accessToken);
        if ( !decryptData ) {
          return redirectToSignIn( request )
        }
        if ( !isTokenValid(decryptData.exp) ) {
          return redirectToSignIn( request )
        }

        switch ( url.pathname ) {
          case '/accounts/wishlist':
          case '/accounts/affiliate-referral':
            if ( decryptData.user_role === USER_ROLE_ADMIN || decryptData.user_role === USER_ROLE_HOST || decryptData.user_role === USER_ROLE_CO_HOST ) {
                return redirectTo404( request )
            }
            break
          case '/accounts/create-listing':
          case '/accounts/calendar':
          case '/accounts/listing':
          case '/accounts/channel-manager':
          case '/accounts/insights':
            if ( decryptData.user_role === USER_ROLE_CUSTOMER ) {
              return redirectTo404( request );
            }
            break
          default:
            break
        }
      }
    return  NextResponse.next()
  }
  catch ( e ) {
    console.log('error in middleware', e)
    return redirectToSignIn( request )
  }
    
}



