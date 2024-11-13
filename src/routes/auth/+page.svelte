<script>
    import {page} from '$app/stores';

    const error = $state($page.url.searchParams.get("error_description"));
</script>

{#if error}
    <p style="color:red">{error}</p>
{/if}
<form method="POST" action="?/login">
    <label>
        Email
        <input name="email" type="email"/>
    </label>
    <label>
        Password
        <input name="password" type="password"/>
    </label>
    <button>Login</button>
    <button formaction="?/signup">Sign up</button>
</form>
<a href="/auth/github">Enter with Github</a>
<br>
<a href="/auth/google">Enter with Google (redirect)</a>

<div style="width:300px;">
    <div id="g_id_onload"
         data-client_id="19807774449-jsd86f7baifms0ctqo4tk3iscfr0need.apps.googleusercontent.com"
         data-context="use"
         data-ux_mode="popup"
         data-login_uri="http://localhost:5173/auth/callback/google"
         data-auto_prompt="false"
         data-use_fedcm_for_prompt="true">
    </div>

    <div class="g_id_signin"
         data-type="standard"
         data-shape="pill"
         data-theme="outline"
         data-text="continue_with"
         data-size="large"
         data-logo_alignment="left">
    </div>
</div>