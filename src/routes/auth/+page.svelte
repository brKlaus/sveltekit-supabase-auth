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