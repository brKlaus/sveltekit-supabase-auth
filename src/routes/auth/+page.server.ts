import {redirect} from '@sveltejs/kit'

import type {Actions} from './$types'

export const actions: Actions = {
    signup: async ({request, url, locals: {supabase}}) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        // if Confirm email is enabled, a user is returned but session is null.
        // if Confirm email is disabled, both a user and a session are returned.
        const {data, error} = await supabase.auth.signUp({
            email, password, options: {emailRedirectTo: url.origin + '/auth/callback'}
        });

        if (error && !data.user) {
            console.error(error)
            redirect(303, '/auth/error')
        } else {
            // if Confirm email is disabled, redirect to your private route main page
            // redirect(303, '/')

            // if Confirm email is enabled, let user know he has to check his email
            return {success: true, status: 201}
        }
    },
    login: async ({request, locals: {supabase}}) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const {error} = await supabase.auth.signInWithPassword({email, password})
        if (error) {
            console.error(error)
            redirect(303, '/auth/error')
        } else {
            redirect(303, '/')
        }
    },
}