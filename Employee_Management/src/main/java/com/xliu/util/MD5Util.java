package com.xliu.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Util {
    static final String SALT = "admin";
    /**
     *   Encrypt String with MD5 + salt
     *
     * @param plainText
     * 		password input by user
     * @return
     *  	Encrypted String consists of lowercase character and digits, length is 32
     */
    public static String MD5Lower(String plainText) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(plainText.getBytes());
            md.update(SALT.getBytes());
            return new BigInteger(1,  md.digest()).toString(16);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *  Verify the validation
     *
     * @param text
     *      user input
     * @param md5
     *      md5 String from database
     * @return result
     */
    public static boolean valid(String text, String md5) {
        return md5.equals(MD5Lower(text));
    }

    /**
     * test
     * @param args
     */
    public static void main(String[] args) {
        String plainText = "123456";
        String saltValue = "admin";
        String md5Res = MD5Lower(plainText);
        System.out.println(md5Res);
        System.out.println("===Result===");
        assert md5Res != null;
        System.out.println(valid(plainText,"e10adc3949ba59abbe56e057f20f883e"));
    }
}
