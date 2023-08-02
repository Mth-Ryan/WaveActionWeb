import { IndentityContext } from '$lib/contexts/identityContext';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
    let from = url.searchParams.get("from") || "/dashboard";
    let identityCtx = new IndentityContext(cookies);

    if (await identityCtx.isLogged())
        throw redirect(303, from);

    return {};
}

export const actions: Actions = {
    default: async ({ request, cookies, url }) => {
        let from = url.searchParams.get("from") || "/dashboard";
        let identityCtx = new IndentityContext(cookies);

        const formData = await request.formData();
        const user = formData.get("userNameOrEmail") as string;
        const password = formData.get("password") as string;
        const keepLogged = (formData.get("keepLogged") as "on" | null) == "on";

        const err = await identityCtx.login(user, password, keepLogged);
        if (!err) {
            throw redirect(303, from);
        } else {
            console.log(err);
            return {
                error: true,
                message: err.response?.data as string,
            }
        }
    }
}