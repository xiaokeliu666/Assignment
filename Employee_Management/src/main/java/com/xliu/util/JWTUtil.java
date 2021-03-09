package com.xliu.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Calendar;
import java.util.Map;

public class JWTUtil {
    private static final String SIGNATURE = "Token4Wesley!Clover@";

    /**
     *
     * @param map
     *      generate token with info from map input
     * @return
     *      token
     */
    public static String getToken(Map<String,String> map) {
        // calculate the expiration date of token(e.g. 7 days)
        Calendar instance = Calendar.getInstance();
        instance.add(Calendar.DATE,7);
        // start to build jwt with claim, expiration date and algorithm
        JWTCreator.Builder builder = JWT.create();
        map.forEach(builder::withClaim);
        String token = builder.withExpiresAt(instance.getTime())
                .sign(Algorithm.HMAC256(SIGNATURE));
        return token;
    }

    /**
     *
     * @param token
     *      input
     * @return
     *      token info(token,header,payload,signature)
     */
    public static DecodedJWT verify(String token) {
        if(token==null) {
            return null;
        }
        return JWT.require(Algorithm.HMAC256(SIGNATURE)).build().verify(token);
    }
}
