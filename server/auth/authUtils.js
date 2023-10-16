"use strict";

import jwt from "jsonwebtoken";

export const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = await jwt.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    // refreshToken
    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    // Verify accessToken
    jwt.verify(accessToken, publicKey, (error, decode) => {
      if (error) {
        console.log(`error verify::`, error);
      } else {
        console.log(`decode verify::`, decode);
      }
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {}
};
