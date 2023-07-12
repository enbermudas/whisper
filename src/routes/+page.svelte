<script lang="ts">
	import type { WhisperType } from "$lib/components/whisper.svelte";
	import Whisper from "$lib/components/whisper.svelte";
	import { Card, Button, Textarea } from "flowbite-svelte";
	import moment from "moment";

	let whispers: WhisperType[] = [
		{
			id: 1,
			content:
				"You whispers will appear over here. Be careful, you can only see 5 at the time. The rest of them will go directly into the void.",
			date: moment()
		}
	];

	let content: string = "";

	const onSubmit = (): void => {
		if (content.trim() === "") return;

		whispers = [...whispers, { id: whispers.length + 1, content, date: moment() }]
			.sort((a, b) => b.id - a.id)
			.slice(0, 5);

		content = "";
	};

	const onKeyDown = (e: KeyboardEvent): void => {
		if (e.key === "Enter") {
			e.preventDefault();
			onSubmit();
		}
	};
</script>

<main class="min-w-screen min-h-screen">
	<section class="flex w-full flex-col items-center gap-4 p-4 sm:py-10">
		<Card class="min-w-full sm:min-w-[600px]">
			<form on:submit|preventDefault={onSubmit}>
				<Textarea
					id="user-input"
					placeholder="What is happening?"
					rows="3"
					bind:value={content}
					maxlength="50"
				/>
				<Button color="blue" class="mt-2 w-full capitalize" type="submit">send</Button>
			</form>
		</Card>

		<div class="h-96 min-w-full sm:min-w-[600px]">
			{#each whispers as whisper}
				<Whisper {whisper} />
			{/each}
		</div>
	</section>
</main>

<svelte:window on:keydown={onKeyDown} />
