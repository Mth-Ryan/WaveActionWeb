import { ZodError, z } from "zod";

import { IndentityContext } from "$lib/contexts/identityContext";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ cookies }) => {
    let identityCtx = new IndentityContext(cookies);

    if (await identityCtx.isLogged())
        throw redirect(303, "/dashboard");

    return {};
}

const validator = z.object({
    userName: z
        .string({ required_error: "Username is required" })
        .min(2, { message: "Username must be at least 2 characters" })
        .max(60, { message: "Username must be less than 60 characters" })
        .regex(/^[a-zA-Z0-9\-_]+$/, { message: "Username must have only letters, numbers, underscores and hyphens" }),

    email: z
        .string({ required_error: "Email is required" })
        .max(100, { message: "Email must be less than 60 characters" })
        .email(),

    firstName: z
        .string({ required_error: "First name is required" })
        .min(2, { message: "First Name must be at least 2 characters" })
        .max(60, { message: "First Name must be less than 60 characters" }),

    lastName: z
        .string({ required_error: "Last name is required" })
        .min(2, { message: "Last Name must be at least 2 characters" })
        .max(60, { message: "First Name must be less than 60 characters" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .max(60, { message: "Password must be less than 60 characters" })
        .regex(/[a-z]/, { message: "Password mus contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password mus contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password mus contain at least one number" })
        .regex(/[#?!@$%^&*\-]/, { message: "Password mus contain at least one special character" }),
});

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        let identityCtx = new IndentityContext(cookies);
        const formData = Object.fromEntries(await request.formData());

        try {
            const data = validator.parse(formData);

            // TODO: Handle signup server errors
            identityCtx.signup({
                userName: data.userName,
                email: data.email,
                password: data.password,
                profile: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                }
            });
        } catch (err) {
            const { fieldErrors: errors } = (err as ZodError).flatten();
            return {
                validationErrors: errors,
                data: formData,
            }
        }

        throw redirect(303, "/dasboard/profile");
    }
}