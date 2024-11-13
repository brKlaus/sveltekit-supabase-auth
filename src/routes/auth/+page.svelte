<script>
    import { page } from '$app/stores';

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
<a href="/auth/google">Enter with Google</a>