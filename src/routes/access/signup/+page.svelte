<script lang="ts">
	import ErrorLabel from "$lib/components/ErrorLabel.svelte";
    import { User, Lock, Mail, Edit3 } from "lucide-svelte";

    type InputData = {
        userName: string,
        email: string,
        firstName: string,
        lastName: string,
        password: string,
    }

    export let form: { 
        data: InputData,
        validationErrors: { [key: string]: string[] },
    };
</script>

<svelte:head>
    <title>Signup - Wave Action</title>
</svelte:head>



<div class="w-full flex items-center justify-center">
    <div>
        <h1 class="text-2xl text-slate-200 mb-3">Signup</h1>
        <form method="POST" class="flex flex-col gap-4 mt-3 md:w-[40ch]">
            <div>
                <ErrorLabel errors={form?.validationErrors?.userName} />
                <label class="outline-input-label">
                    <User size=22 />
                    <input 
                        class="outline-inner-input"
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={form?.data?.userName ? form?.data?.userName : ""} 
                    />
                </label>
            </div>

            <div>
                <ErrorLabel errors={form?.validationErrors?.firstName} />
                <label class="outline-input-label">
                    <Edit3 size=22 />
                    <input
                        class="outline-inner-input"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={form?.data?.firstName ? form?.data?.firstName : ""} 
                    />
                </label>
            </div>

            <div>
                <ErrorLabel errors={form?.validationErrors?.lastName} />
                <label class="outline-input-label">
                    <Edit3 size=22 />
                    <input
                        class="outline-inner-input"
                        type="text"
                        name="lastName"
                        placeholder="Last Name" 
                        value={form?.data?.lastName ? form?.data?.lastName : ""} 
                    />
                </label>
            </div>

            <div>
                <ErrorLabel errors={form?.validationErrors?.email} />
                <label class="outline-input-label">
                    <Mail size=22/>
                    <input
                        class="outline-inner-input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form?.data?.email ? form?.data?.email : ""} 
                    />
                </label>
            </div>

            <div>
                <ErrorLabel errors={form?.validationErrors?.password} />
                <label class="outline-input-label">
                    <Lock size=22 />
                    <input
                        class="outline-inner-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form?.data?.password ? form?.data?.password : ""} 
                    >
                </label>
            </div>

            <button class="elevated-button" type="submit">
                signup
            </button>
        </form>

        <div class=" mt-2 flex justify-center">
            <a href="/access/login">Have an account?</a>
        </div>
    </div>
</div>