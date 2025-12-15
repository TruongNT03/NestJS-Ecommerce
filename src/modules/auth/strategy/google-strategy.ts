import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { googleOAuthConfiguration } from 'src/config';
import { UserGooglePayload } from '../auth.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOAuthConfiguration.KEY)
    private readonly googleOAuthConfig: ConfigType<typeof googleOAuthConfiguration>,
  ) {
    super({
      clientID: googleOAuthConfig.clientID,
      clientSecret: googleOAuthConfig.clientSecret,
      callbackURL: googleOAuthConfig.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile): UserGooglePayload {
    const { id, emails, photos, displayName } = profile;

    return {
      googleId: id,
      email: emails[0].value,
      name: displayName,
      avatar: photos[0].value,
    };
  }
}
