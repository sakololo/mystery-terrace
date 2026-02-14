import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#FDF6E3] p-8 font-sans text-[#4A4A4A]">
            <div className="max-w-3xl mx-auto bg-white p-12 rounded-2xl shadow-sm border border-[#E6D5B8]">
                <h1 className="text-2xl font-bold mb-8 text-[#5D4037]">利用規約</h1>

                <div className="space-y-6 text-sm leading-relaxed">
                    <section>
                        <h2 className="font-bold text-[#8D6E63] mb-2">第1条（はじめに）</h2>
                        <p>
                            この利用規約（以下「本規約」）は、Mystery Terrace（以下「当店」）が提供するサービス（以下「本サービス」）の利用条件を定めるものです。
                            本サービスをご利用になるすべての皆様（以下「ユーザー」）には、本規約に従って本サービスをご利用いただきます。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold text-[#8D6E63] mb-2">第2条（サービスの目的）</h2>
                        <p>
                            本サービスは、日常の些細な謎や不思議な出来事を共有し、それに対する推理を楽しむためのエンターテインメント・プラットフォームです。
                            フィクション、ノンフィクションを問わず、心地よいミステリー体験を提供することを目的としています。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold text-[#8D6E63] mb-2">第3条（アカウント登録）</h2>
                        <p>
                            本サービスの利用には、Google アカウントを使用したログインが必要です。
                            当店は、ユーザーのGoogleアカウント名やメールアドレスを、本サービスのデータベース内に個人情報として保持・活用することはありません。
                            ユーザーIDおよび表示名は、システムによりランダムに生成・割り当てられます。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold text-[#8D6E63] mb-2">第4条（禁止事項）</h2>
                        <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
                        <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-600">
                            <li>法令または公序良俗に違反する行為</li>
                            <li>犯罪行為に関連する行為</li>
                            <li>他のユーザーまたは第三者を誹謗中傷する行為</li>
                            <li>過度に暴力的、残酷、差別的な表現を含むコンテンツを投稿する行為</li>
                            <li>スパム行為、荒らし行為、またはサービスの運営を妨害する行為</li>
                            <li>その他、当店が不適切と判断する行為</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-bold text-[#8D6E63] mb-2">第5条（免責事項）</h2>
                        <p>
                            当店は、本サービスの内容変更、中断、終了によってユーザーに生じた損害について、一切の責任を負いません。
                            また、ユーザーが投稿したコンテンツの内容について、当店は一切の責任を負いません。
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold text-[#8D6E63] mb-2">第6条（規約の変更）</h2>
                        <p>
                            当店は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
                            本規約変更後に本サービスを利用した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
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
