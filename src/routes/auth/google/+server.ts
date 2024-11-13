import {redirect} from "@sveltejs/kit";

export const GET = async ({locals: {supabase}, url}) => {
    const {data} = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: url.origin + "/auth/callback",
        },
    });

    if (data.url) {
        redirect(303, data.url);
    }

    redirect(303, "/auth/error");
};