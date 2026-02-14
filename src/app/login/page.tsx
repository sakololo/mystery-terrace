import { LoginButton } from '@/components/auth/LoginButton';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF6E3] p-4 font-sans text-[#4A4A4A]">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-[#E6D5B8]">
                <div className="mb-6">
                    <span className="text-4xl">☕</span>
                </div>

                <h1 className="text-2xl font-bold mb-2 text-[#5D4037]">
                    Mystery Terrace
                </h1>
                <p className="text-sm text-gray-500 mb-8">
                    日常の謎と推理を楽しむ、<br />
                    小さなカフェへようこそ。
                </p>

                <div className="space-y-4">
                    <div className="flex justify-center">
                        <LoginButton />
                    </div>

                    <p className="text-xs text-gray-400 mt-6">
                        ログインすることで、<br />
                        <a href="/terms" className="underline hover:text-[#5D4037]">利用規約</a> と <a href="/privacy" className="underline hover:text-[#5D4037]">プライバシーポリシー</a> に<br />
                        同意したものとみなされます。
                    </p>
                </div>
            </div>
        </div>
    );
}
