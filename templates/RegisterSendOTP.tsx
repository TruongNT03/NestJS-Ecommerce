import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as dotenv from 'dotenv';
dotenv.config();

interface VerifyEmailProps {
  verificationCode?: string;
}

export default function VerifyEmail({ verificationCode }: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white my-12 mx-auto p-8 rounded-lg shadow-md max-w-md">
            <Img
              src={process.env.MAIL_LOGO_URL}
              width={180}
              alt="Logo"
              style={{
                display: 'block',
              }}
              className="mx-auto mb-16"
            />

            <Heading className="text-2xl font-semibold text-center text-gray-800 mt-6 text-center">
              Xác thực địa chỉ email của bạn
            </Heading>

            <Text className="text-gray-600 text-base leading-relaxed my-4 text-center">
              Cảm ơn bạn đã đăng ký. Vui lòng sử dụng mã OTP dưới đây để hoàn tất việc xác thực tài
              khoản:
            </Text>

            <Section className="text-center my-6">
              <Text className="inline-block bg-gray-200 text-black text-3xl font-bold tracking-widest p-3 px-5 rounded-md">
                {verificationCode}
              </Text>
            </Section>

            <Text className="text-gray-600 text-base leading-relaxed text-center">
              Vì lý do bảo mật, mã này sẽ chỉ có hiệu lực trong vòng 5 phút.
            </Text>

            <Text className="text-gray-600 text-base leading-relaxed mt-4 text-center">
              Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này một cách an toàn.
            </Text>

            <Hr className="border-gray-300 my-5" />

            <Text className="text-gray-500 text-xs text-center">
              © 2025 Tee Shop, Hà Nội, Việt Nam
            </Text>
            <Link
              href="https://teeshop.io.vn"
              className="text-gray-500 text-xs text-center block underline"
            >
              teeshop.io.vn
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
