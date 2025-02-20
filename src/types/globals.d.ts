export {};

// Create a type for the roles
export type Roles = "admin" | "user";
export type Language = "en";
export type DateOfBirth = DateTime;
export type ContentRating = "U" | "UA_7" | "UA_13" | "UA_16" | "A";
export type ParentalControlConfig = {
  enabled: boolean;
  parentalControlCode: string;
};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
      language?: Language;
      dateOfBirth?: DateOfBirth;
      contentRating?: ContentRating;
      parentalControlConfig?: ParentalControlConfig;
    };
  }
}
