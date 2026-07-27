import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { CtaButton } from '@/components/site/cta-button'
import { Shell } from '@/components/site/primitives'
import { JsonLd } from '@/components/site/json-ld'
import { POSTS } from '@/lib/content'
import { articleSchema, breadcrumbSchema, graph, pageMeta } from '@/lib/seo'

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS.find((item) => item.slug === slug)
  if (!post) return {}
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    keywords: [post.category, 'digital marketing', `WayBing ${post.category}`],
  })
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS.find((item) => item.slug === slug)
  if (!post) notFound()

  const sections = post.body.filter((block) => block.heading)
  const more = POSTS.filter((item) => item.slug !== slug).slice(0, 3)

  return (
    <>
      <article>
        <header className="border-b border-border bg-muted">
          <Shell className="py-14 sm:py-20">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 label-mono text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              All resources
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 label-mono">
              <span className="bg-accent px-2 py-1 text-accent-foreground">{post.category}</span>
              <span className="text-muted-foreground">{formatDate(post.date)}</span>
              <span className="text-muted-foreground">{post.readTime} read</span>
            </div>
            <h1 className="display-tight mt-6 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] text-balance">{post.title}</h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{post.excerpt}</p>
          </Shell>
        </header>

        <Shell className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="max-w-3xl">
            {post.body.map((block, i) => (
              <section key={i} className={i > 0 ? 'mt-12' : ''}>
                {block.heading ? (
                  <h2
                    id={`section-${i}`}
                    className="scroll-mt-32 border-t border-border pt-8 text-2xl font-semibold uppercase tracking-[-0.02em] text-balance sm:text-3xl"
                  >
                    {block.heading}
                  </h2>
                ) : null}
                {block.paragraphs.map((paragraph, pi) => (
                  <p
                    key={pi}
                    className={`text-base leading-relaxed text-muted-foreground sm:text-lg ${
                      pi === 0 && block.heading ? 'mt-6' : pi === 0 ? '' : 'mt-5'
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
                {block.list ? (
                  <ul className="mt-7 flex flex-col border-t border-border">
                    {block.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 border-b border-border py-4 text-sm leading-relaxed">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="flex h-max flex-col gap-6 lg:sticky lg:top-32">
            {sections.length ? (
              <nav aria-label="On this page" className="border border-border p-5">
                <p className="label-mono text-muted-foreground">On this page</p>
                <ol className="mt-4 flex flex-col gap-3">
                  {post.body.map((block, i) =>
                    block.heading ? (
                      <li key={i}>
                        <a
                          href={`#section-${i}`}
                          className="text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {block.heading}
                        </a>
                      </li>
                    ) : null,
                  )}
                </ol>
              </nav>
            ) : null}

            <div className="border border-foreground bg-foreground p-5 text-background">
              <p className="label-mono text-background/50">Want this run for you?</p>
              <p className="mt-4 text-sm leading-relaxed text-background/80">
                We will audit your funnel and tracking setup in 48 hours and send the leak list. Free, no deck.
              </p>
              <CtaButton
                intent="audit"
                className="mt-6 w-full border-background bg-background text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                Get the free audit
              </CtaButton>
            </div>
          </aside>
        </Shell>
      </article>

      <section className="border-t border-border bg-muted py-16 sm:py-24">
        <Shell>
          <h2 className="border-b border-border pb-6 text-2xl font-semibold uppercase tracking-[-0.02em]">Keep reading</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {more.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex flex-col justify-between gap-8 border border-border bg-background p-6 transition-colors hover:border-foreground"
              >
                <div>
                  <p className="label-mono text-accent">{item.category}</p>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-balance">{item.title}</h3>
                </div>
                <span className="flex items-center justify-between gap-2 label-mono text-muted-foreground">
                  {item.readTime} read
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Shell>
      </section>
      <JsonLd
        data={graph(
          articleSchema(post),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Resources', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ])
        )}
      />
    </>
  )
}
