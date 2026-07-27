import type { Metadata } from 'next'
import { BookingSection } from '@/components/site/booking-section'
import { PageHero } from '@/components/site/page-hero'
import { PostList } from '@/components/site/post-list'
import { Shell } from '@/components/site/primitives'
import { JsonLd } from '@/components/site/json-ld'
import { POSTS } from '@/lib/content'
import { breadcrumbSchema, graph, pageMeta } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Digital Marketing Resources — CRO, Tracking, Paid & SEO Playbooks',
  description:
    'The digital marketing frameworks WayBing runs on client accounts, written out in full: server-side tracking, landing page teardowns, creative testing and commercial SEO.',
  path: '/blog',
  keywords: ['digital marketing playbooks', 'WayBing resources', 'CRO guide', 'server-side tracking guide', 'SEO playbook'],
})

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Resources"
        title={
          <>
            The playbooks we run, <span className="text-accent">given away.</span>
          </>
        }
        intro="No email gate, no drip sequence. These are the actual frameworks our team uses on client accounts. If you want to run them yourself, everything you need is here."
      />

      <section className="border-b border-border py-16 sm:py-24">
        <Shell>
          <PostList />
        </Shell>
      </section>

      <BookingSection />
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Resources', path: '/blog' },
          ]),
          {
            '@type': 'Blog',
            name: `${SITE.name} digital marketing resources`,
            url: `${SITE.url}/blog`,
            blogPost: POSTS.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              url: `${SITE.url}/blog/${post.slug}`,
              datePublished: post.date,
            })),
          }
        )}
      />
    </>
  )
}
