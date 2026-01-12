import { type Article } from '@/functions/libs/drizzle/schema'

const ID = 'cm07vrx4y00002vwkx0koma0j'

export const CONTENT = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

const MOCK_ARTICLE = {
  id: `MOCK_ARTICLE_${ID}`,
  title: 'MOCK_ARTICLE',
  content: CONTENT,
  status: 'PUBLISHED',
  authorId: `AUTHOR_${ID}`, // override authorId to avoid foreign key constraint error
  createdAt: new Date('2024-08-31T05:16:36.323Z'),
  updatedAt: new Date('2024-08-31T05:16:36.323Z'),
} satisfies Article

const MOCK_ARTICLE_PUBLISH = {
  id: `MOCK_ARTICLE_PUBLISH_${ID}`,
  title: 'MOCK_ARTICLE_PUBLISH',
  content: CONTENT,
  status: 'PUBLISHED',
  authorId: `AUTHOR_${ID}`, // override authorId to avoid foreign key constraint error
  createdAt: new Date('2024-08-31T05:16:36.323Z'),
  updatedAt: new Date('2024-08-31T05:16:36.323Z'),
} satisfies Article

const MOCK_ARTICLE_DRAFT = {
  id: `MOCK_ARTICLE_DRAFT_${ID}`,
  title: 'MOCK_ARTICLE_DRAFT',
  content: CONTENT,
  status: 'DRAFT',
  authorId: `AUTHOR_${ID}`, // override authorId to avoid foreign key constraint error
  createdAt: new Date('2024-08-31T05:16:36.323Z'),
  updatedAt: new Date('2024-08-31T05:16:36.323Z'),
} satisfies Article

export const MOCK_ARTICLES = [
  MOCK_ARTICLE,
  MOCK_ARTICLE_PUBLISH,
  MOCK_ARTICLE_DRAFT,
] satisfies Article[]
