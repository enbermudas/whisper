import { expect, test } from "@playwright/test";

test("[index page] has a textarea", async ({ page }) => {
	await page.goto("/");
	await expect(page.locator("textarea#user-input")).toBeVisible();
});

test("[index page] has a submit button", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByText(/send/i)).toBeVisible();
});

test("[index page] has a default whisper", async ({ page }) => {
	await page.goto("/");
	await expect(page.locator("div#whisper-1")).toBeVisible();
});

test("[index page] user can submit a new whisper by clicking the submit button", async ({
	page
}) => {
	const newWhisperText = "This is a test whisper!";

	await page.goto("/");

	const textarea = page.locator("textarea#user-input");
	const submitButton = page.getByText(/send/i);

	await textarea.type(newWhisperText);
	await submitButton.click();

	await expect(page.locator("div#whisper-2")).toBeVisible();
	await expect(await page.locator("div#whisper-2").textContent()).toEqual(
		`${newWhisperText} a few seconds ago`
	);
});

test('[index page] user can submit a new whisper by pressing the "Enter" key', async ({ page }) => {
	const newWhisperText = "This is a test whisper!";

	await page.goto("/");

	const textarea = page.locator("textarea#user-input");

	await textarea.type(newWhisperText);
	await textarea.press("Enter");

	await expect(page.locator("div#whisper-2")).toBeVisible();
	await expect(await page.locator("div#whisper-2").textContent()).toEqual(
		`${newWhisperText} a few seconds ago`
	);
});
