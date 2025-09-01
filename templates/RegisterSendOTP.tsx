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

interface VerifyEmailProps {
  verificationCode?: string;
}

const logoUrl =
  'https://static.wixstatic.com/media/74dca5_21d0c05c40b34ea89ca93217adfa8269~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg';

export default function VerifyEmail({ verificationCode }: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Mã OTP của bạn là: {verificationCode}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white my-12 mx-auto p-8 rounded-lg shadow-md max-w-md">
            <Img
              src={logoUrl}
              width="48"
              height="48"
              alt="Logo Công Ty"
              className="mx-auto"
            />

            <Heading className="text-2xl font-semibold text-center text-gray-800 mt-6">
              Xác thực địa chỉ email của bạn
            </Heading>

            <Text className="text-gray-600 text-base leading-relaxed my-4">
              Cảm ơn bạn đã đăng ký. Vui lòng sử dụng mã OTP dưới đây để hoàn
              tất việc xác thực tài khoản:
            </Text>

            <Section className="text-center my-6">
              <Text className="inline-block bg-gray-200 text-black text-3xl font-bold tracking-widest p-3 px-5 rounded-md">
                {verificationCode}
              </Text>
            </Section>

            <Text className="text-gray-600 text-base leading-relaxed">
              Vì lý do bảo mật, mã này sẽ chỉ có hiệu lực trong vòng 5 phút.
            </Text>

            <Text className="text-gray-600 text-base leading-relaxed mt-4">
              Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này một cách
              an toàn.
            </Text>

            <Hr className="border-gray-300 my-5" />

            <Text className="text-gray-500 text-xs text-center">
              © 2025 Tên Công Ty Của Bạn, Địa chỉ công ty
            </Text>
            <Link
              href="https://your-website.com"
              className="text-gray-500 text-xs text-center block underline"
            >
              your-website.com
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
