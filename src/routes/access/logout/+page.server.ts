import { IndentityContext } from "$lib/contexts/identityContext";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ cookies }) => {
    let identityCtx = new IndentityContext(cookies);
    identityCtx.logout();

    throw redirect(303, "/");
}
