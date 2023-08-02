<script lang="ts">
	import Checkbox from "$lib/components/Checkbox.svelte";
	import ErrorBox from "$lib/components/ErrorBox.svelte";
    import { User, Lock } from "lucide-svelte";

    export let form: { error: boolean, message: string };
</script>

<svelte:head>
    <title>Login - Wave Action</title>
</svelte:head>

<div class="w-full flex items-center justify-center">
    <div>
        <h1 class="text-2xl text-slate-200 mb-3">Login</h1>
        {#if form?.error}
            <ErrorBox message={form?.message} />
        {/if}
        <form method="POST" class="flex flex-col gap-4 mt-3 md:w-[40ch]">
            <label class="outline-input-label">
                <User size=22 />
                <input class="outline-inner-input" type="text" name="userNameOrEmail" placeholder="Username or Email">
            </label>

            <label class="outline-input-label">
                <Lock size=22 />
                <input class="outline-inner-input" type="password" name="password" placeholder="Password">
            </label>

            <div class="flex gap-2 items-center">
                <Checkbox name="keepLogged" />
                <span class="text-slate-500">Remember me</span>
            </div>

            <button class="elevated-button" type="submit">
                login
            </button>
        </form>

        <div class=" mt-2 flex justify-center">
            <a href="/access/forgotyourpassword">Forgot password?</a>
        </div>
    </div>
</div>
