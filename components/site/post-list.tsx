'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { POSTS, POST_CATEGORIES } from '@/lib/content'

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function PostList() {
  const [active, setActive] = useState<string>('All')
  const posts = active === 'All' ? POSTS : POSTS.filter((post) => post.category === active)
  const featured = posts.find((post) => post.featured) ?? posts[0]
  const rest = posts.filter((post) => post.slug !== featured?.slug)

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-6">
        <span className="mr-2 label-mono text-muted-foreground">Topic</span>
        {POST_CATEGORIES.map((category) => {
          const isActive = category === active
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                isActive
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      {featured ? (
        <Reveal key={`${active}-${featured.slug}`} variant="scale" className="mt-8">
        <Link
          href={`/blog/${featured.slug}`}
          className="lift group grid border border-foreground hover:bg-muted lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
        >
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 label-mono">
              <span className="bg-accent px-2 py-1 text-accent-foreground">Featured</span>
              <span className="text-accent">{featured.category}</span>
              <span className="text-muted-foreground">{formatDate(featured.date)}</span>
              <span className="text-muted-foreground">{featured.readTime} read</span>
            </div>
            <h2 className="display-tight mt-7 text-[clamp(1.75rem,4vw,3rem)] text-balance">{featured.title}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{featured.excerpt}</p>
            <span className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 font-mono text-xs uppercase tracking-[0.14em]">
              Read the playbook
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
          <div className="flex flex-col justify-end gap-3 border-t border-border p-6 sm:p-10 lg:border-t-0 lg:border-l">
            {['Event schema template', 'Container build order', 'Recovery reporting'].map((item, i) => (
              <div key={item} className="flex items-baseline gap-4 border-b border-border pb-3 last:border-b-0">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </Link>
        </Reveal>
      ) : null}

      <div className="mt-4 grid border-t border-l border-border md:grid-cols-2 xl:grid-cols-3">
        {rest.map((post, index) => (
          <Reveal key={`${active}-${post.slug}`} delay={index * 60} className="flex">
          <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-1 flex-col justify-between border-r border-b border-border p-6 transition-colors hover:bg-muted sm:p-8"
          >
            <div>
              <div className="flex items-center justify-between gap-4 label-mono">
                <span className="text-accent">{post.category}</span>
                <span className="text-muted-foreground">{post.readTime}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold uppercase tracking-[-0.01em] text-balance">{post.title}</h3>
              <p className="copy-sm mt-4 text-muted-foreground">{post.excerpt}</p>
            </div>
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-5 label-mono text-muted-foreground">
              {formatDate(post.date)}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
          </Reveal>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Nothing published under this topic yet.
        </p>
      ) : null}
    </div>
  )
}
