CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT '4738019b-b925-454c-8908-2febed859881' NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"avatar" text,
	"accessToken" uuid,
	"refreshToken" uuid,
	"acceptedPolicy" boolean DEFAULT false,
	"newsaletter" boolean DEFAULT true,
	"role" text DEFAULT 'user',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"status" text DEFAULT 'inactive',
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
