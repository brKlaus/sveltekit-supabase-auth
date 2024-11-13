import {redirect} from "@sveltejs/kit";

export const POST = async (event): Promise<void> => {
    const {
        request,
        url,
        locals: {supabase},
    } = event;
    const formData = await request.formData()
    const credential = formData.get("credential") as string;
    const next = url.searchParams.get("next") ?? "/";

    /**
     * Clean up the redirect URL by deleting the Auth flow parameters.
     *
     * `next` is preserved for now, because it's needed in the error case.
     */
    const redirectTo = new URL(url);
    redirectTo.pathname = next;
    redirectTo.searchParams.delete('credential');

    if (credential) {
        const {error} = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: credential
        });

        if (!error) {
            throw redirect(303, redirectTo);
        }
    }

    redirectTo.pathname = '/auth';
    redirect(303, redirectTo);
};