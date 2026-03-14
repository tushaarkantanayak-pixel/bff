import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";

export const metadata: Metadata = {
    title: "How to Gift MLBB Diamonds to Friends (2025 Guide)",
    description: "Learn how to easily gift Mobile Legends diamonds to your friends using their Player ID. Safe, fast, and secure gifting guide.",
    alternates: { canonical: "https://bluebuff.in/blog/how-to-gift-mlbb-diamonds" },
};

export default function BlogPage() {
    return (
        <BlogPostLayout
            title="HOW TO GIFT MLBB DIAMONDS TO FRIENDS (2025)"
            category="Guide"
            readTime="3 min read"
            date="Feb 07, 2025"
            image="https://res.cloudinary.com/dk0sslz1q/image/upload/v1765619191/ideogram-v3.0_A_high-quality_horizontal_rectangular_website_banner_for_a_gaming_top-up_website-0_2_rgpuck.png"
        >
            <p className="text-lg md:text-xl font-medium !opacity-100 italic border-l-4 border-[var(--accent)] pl-6 py-2 bg-[var(--accent)]/5 rounded-r-2xl">
                Surprise your squad with the gift of diamonds! <strong>Gifting MLBB diamonds</strong> is the perfect way to help your friends unlock their dream skins or the latest Starlight Pass.
            </p>

            <h2>Why Gift Diamonds?</h2>
            <p>
                Mobile Legends: Bang Bang is more fun with friends. Whether it's for a birthday, a tournament win, or just because, sending diamonds allows your teammates to choose exactly what they want from the shop. It's often better than gifting a specific skin because it gives them the freedom of choice.
            </p>

            <h2>How to Gift via Player ID</h2>
            <p>
                The safest and fastest way to send diamonds is through a top-up service that supports <strong>Player ID</strong> and <strong>Server ID</strong>. Here is how you can do it:
            </p>
            <ol>
                <li>Ask your friend for their <strong>Player ID</strong> and <strong>Server ID</strong> (found in their profile).</li>
                <li>Visit a trusted top-up site like <strong>MLBTopUp.in</strong>.</li>
                <li>Enter their Player ID and Server ID in the required fields.</li>
                <li>Select the amount of diamonds you want to send.</li>
                <li>Complete the payment.</li>
            </ol>
            <p>
                The diamonds will be instantly credited to their account. NO login or password is required!
            </p>

            <div className="bg-[var(--card)] border border-[var(--border)] p-10 rounded-[40px] my-16 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]" />
                <h3 className="italic font-black uppercase text-[var(--accent)] mb-4">Pro Tip 💡</h3>
                <p className="text-sm italic opacity-70 m-0">
                    Double-check the username that appears after entering the ID. This ensures you are sending the gift to the right person!
                </p>
            </div>

            <h2>Can I Gift Starlight Memberships?</h2>
            <p>
                Yes! utilizing the same method, you can select the <strong>Weekly Diamond Pass</strong> or <strong>Starlight Membership</strong> instead of just diamonds. This is often a more valuable gift as it provides long-term benefits for your friend.
            </p>

            <div className="mt-20 pt-10 border-t border-[var(--border)]">
                <h4 className="text-xl font-black italic uppercase tracking-widest mb-8 opacity-40 transition-colors">Gifting FAQ</h4>
                <div className="space-y-8">
                    <div className="group">
                        <h5 className="text-[var(--accent)] font-black uppercase tracking-tight text-base mb-2 group-hover:translate-x-1 transition-transform italic">Is it safe to gift via ID?</h5>
                        <p className="text-sm opacity-60">Absolutely. Since you only use the public Player ID, there is zero risk to either account.</p>
                    </div>
                    <div className="group">
                        <h5 className="text-[var(--accent)] font-black uppercase tracking-tight text-base mb-2 group-hover:translate-x-1 transition-transform italic">How long does it take?</h5>
                        <p className="text-sm opacity-60">Gifts sent via top-up services are usually instant, arriving within seconds of payment confirmation.</p>
                    </div>
                </div>
            </div>
        </BlogPostLayout>
    );
}
