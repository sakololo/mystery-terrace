import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#FDF6E3] p-8 font-sans text-[#4A4A4A]">
            <div className="max-w-3xl mx-auto bg-white p-12 rounded-2xl shadow-sm border border-[#E6D5B8]">
                <h1 className="text-2xl font-bold mb-8 text-[#5D4037]">プライバシーポリシー</h1>

                <div className="space-y-6 text-sm leading-relaxed">
                    <section>
                        <h2 className="font-bold text-[#8D6E63] mb-2">1. 個人情報の取り扱いについて</h2>
                        <p>
                            Mystery Terrace（以下「当店」）は、ユーザーのプライバシーを最大限尊重し、「個人情報を持たない」ことを基本方針としています。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold text-[#8D6E63] mb-2">2. 取得する情報とその利用目的</h2>
                        <p>当店は、以下の情報を取得しますが、その利用は限定的です。</p>
                        <div className="mt-4 pl-4 border-l-2 border-[#E6D5B8]">
                            <h3 className="font-bold text-gray-700">Google アカウント情報</h3>
                            <p className="mt-1">
                                ログイン認証のために Google OAuth を使用します。
                                Google から提供される「名前」「メールアドレス」「プロフィール画像」等の情報は、認証プロセスにおいて一時的に参照されますが、
                                <span className="font-bold text-[#5D4037]">当店のデータベースにこれらを永続的に保存し、ユーザープロフィールとして表示することはありません。</span>
                            </p>
                            <p className="mt-2">
                                代わりに、システムがランダムに生成した「表示名」と「アイコン」を使用します。
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-bold text-[#8D6E63] mb-2">3. データの保存</h2>
                        <p>
                            ユーザーが投稿した「ミステリー（謎）」や「推理」、「コメント」等のテキストデータは、データベースに保存され、本サービス上で公開されます。
                            これらは、ユーザー自身が公開を意図して投稿した情報に限られます。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold text-[#8D6E63] mb-2">4. 第三者への提供</h2>
                        <p>
                            当店は、法令に基づく場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。
                            （そもそも、提供できる個人情報を保持していません。）
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold text-[#8D6E63] mb-2">5. お問い合わせ</h2>
                        <p>
                            プライバシーポリシーに関するお問い合わせは、開発者（GitHub: @sakololo）までご連絡ください。
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                    <Link href="/login" className="text-[#8D6E63] hover:text-[#5D4037] underline">
                        ログイン画面に戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
