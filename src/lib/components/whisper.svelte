<script context="module" lang="ts">
	export type WhisperType = {
		id: number;
		content: string;
		date: Moment;
	};
</script>

<script lang="ts">
	import { Card } from "flowbite-svelte";
	import type { Moment } from "moment";

	export let whisper: WhisperType;
</script>

<Card id={`whisper-${whisper.id}`} class="mb-4 min-w-full sm:min-w-[600px]">
	<p class="text-white">{whisper.content}</p>
	<span class="mt-4 w-full text-right text-xs italic">{whisper.date.fromNow()}</span>
</Card>
