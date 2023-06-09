import { expect, test } from '@playwright/test'

test.describe('conduit', () => {
        

    test.beforeEach(async ({ page }) => {
        const url = 'https://react-redux.realworld.io/'
        const username = 'tech_task@qats.sk'
        const password = '124lkjAF89as'
        
        await page.goto(url)

        // find elements
        const btnSigninMain = page.locator('[href="#login"]')
        const inputUsername = page.locator('[type="email"]')
        const inputPassword = page.locator('[type="password"]')
        const btnSignin = page.locator('[type="submit"]')
        
        // login
        await btnSigninMain.click()
        await inputUsername.click()
        await inputUsername.fill(username)
        await inputPassword.click()
        await inputPassword.fill(password)
        await btnSignin.click()
      });
    test('create and publish New Post', async ({ page }) => {
        const btnSettings = page.locator('[href="#settings"]')
        const btnLogout = page.locator('[class="btn btn-outline-danger"]')
        const articleTitle = 'New Post - Technical Task'

        // find elements
        const btnNewPost = page.locator('[href="#editor"]')
        const btnArticleTitle = page.locator('[placeholder="Article Title"]')
        const btnArticleInfo = page.locator('[placeholder*="this article about?"]')
        const btnArticleDescription = page.locator('[placeholder="Write your article (in markdown)"]')

        const btnPublishArticle = page.locator('[type="button"]:text("Publish Article")')
        // create and publish 'New Post'
        await btnNewPost.click()
        await btnArticleTitle.fill(articleTitle)
        await btnArticleInfo.first().click()
        await btnArticleInfo.fill(articleTitle)
        await btnArticleDescription.click()
        await btnArticleDescription.fill(articleTitle)
        await btnPublishArticle.click()
        
        //check
        const nazovTasku = page.getByRole('heading', { name: 'New Post - Technical Task' })
        await expect.soft(nazovTasku).toBeVisible()
        
        // logout
        await btnSettings.click()
        await btnLogout.click()
    })
    test('delete Post', async ({ page }) => {
        const btnSettings = page.locator('[href="#settings"]')
        const btnLogout = page.locator('[class="btn btn-outline-danger"]')
        const articleTitle = page.locator('[href="#article/New-Post-Technical-Task-35746"]')

        // find elements
        const btnGlobalFeed = page.locator('text=Global Feed')
        const btnDeleteArticle = page.locator('button:has-text("Delete Article")')
        
        // create and publish 'New Post'
        await btnGlobalFeed.click()
        await expect(articleTitle).toBeVisible()
        await articleTitle.click()
        await btnDeleteArticle.click()
        
        // logout
        await btnSettings.click()
        await btnLogout.click()
    })
})