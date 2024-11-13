import {redirect} from "@sveltejs/kit";

export const GET = async (event) => {
    const {
        url,
        locals: {supabase},
    } = event;
    const code = url.searchParams.get("code") as string;
    const next = url.searchParams.get("next") ?? "/";

    /**
     * Clean up the redirect URL by deleting the Auth flow parameters.
     *
     * `next` is preserved for now, because it's needed in the error case.
     */
    const redirectTo = new URL(url);
    redirectTo.pathname = next;
    redirectTo.searchParams.delete('code');

    if (code) {
        const {error} = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            throw redirect(303, redirectTo);
        }
    }

    redirectTo.pathname = '/auth';
    redirect(303, redirectTo);
};