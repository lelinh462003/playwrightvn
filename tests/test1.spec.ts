import { expect, test } from "@playwright/test";

const username = "Lê Phượng Linh";
const Email = "lelinh462003@gmail.com";
const Interests = "Music";
const Country = "Canada";
const Biography = "Tôi đang học Playwright";
const date = "2026-05-02";
const ratings = "4";
const favorite = "#00ff00";

test("Exercise 1: Register Page", async ({ page }) => {
    await test.step("Navigate to Material Playwright Page", async () => {
        await page.goto("https://material.playwrightvn.com/");
    });

    await test.step("Click on User Registration", async () => {
        await page.locator('//a[@href="01-xpath-register-page.html"]').click();
    });

    await test.step("Fill information to all fields", async () => {
        await page.locator("#username").fill(username);
        await page.locator("#email").pressSequentially(Email);
        await page.locator("#female").check();
        await page.locator("#traveling").check();
        await page.locator("#interests").selectOption(Interests);
        await page.locator("#country").selectOption(Country);
        await page.locator("#dob").fill(date);
        await page.locator("#profile").setInputFiles("test1.txt");
        await page.locator("#bio").fill(Biography);
        await page.locator("#rating").fill(ratings);
        await page.locator("#favcolor").fill(favorite);
        await page.locator("#newsletter").check();
        await page.locator("label.switch").click();
    });

    // ⭐ STAR RATING
    const star = page.locator("#starRating");
    const box = await star.boundingBox();
    if (!box) throw new Error("Star rating not visible");

    const starWidth = box.width / 5;
    const ratingValue = Number(ratings);

    // click gần giữa sao thứ N
    const clickX = box.x + starWidth * (ratingValue - 0.5);
    const clickY = box.y + box.height / 2;

    await page.mouse.click(clickX, clickY);

    // 👉 UI trả về FLOAT → ROUND theo business
    const actualRating = Number(await page.locator("#starRatingValue").textContent());

    expect(Math.round(actualRating)).toBe(ratingValue);

    //

    await page.evaluate(() => {
        const el = document.querySelector("#customDate") as HTMLInputElement;
        el.value = "2025-01-15";
        el.dispatchEvent(new Event("change", { bubbles: true }));
    });

    await expect(page.locator("#customDate")).toHaveValue("2025-01-15");

    await page.locator('//button[text() = "Register"]').click();
});
