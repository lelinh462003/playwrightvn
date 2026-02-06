import { test } from "@playwright/test";

test("Exercise 3: Todo page", async ({ page }) => {
    // 3. Tự động bấm OK cho confirm delete
    page.on("dialog", async (dialog) => {
        await dialog.accept();
    });
    await test.step("Navigate to Material Playwright Page", async () => {
        await page.goto("https://material.playwrightvn.com/");
    });

    await test.step("Click on Todo page", async () => {
        await page.locator('//a[@href="03-xpath-todo-list.html"]').click();
    });

    // 2. Thêm 100 todo
    for (let i = 1; i <= 100; i++) {
        await page.fill("#new-task", `Todo ${i}`);
        //await page.click("#add-task");
        await page.locator('//button[@id="add-task"]').click();
    }

    // 4. Xóa todo số lẻ: 1 → 99
    for (let i = 1; i <= 99; i += 2) {
        const todoItem = page.locator("li", {
            has: page.locator("span", {
                hasText: new RegExp(`^Todo ${i}$`),
            }),
        });

        await todoItem.locator("button", { hasText: "Delete" }).click();
    }
    //
});
