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

interface AdminAccountCreatedProps {
  email: string;
  password: string;
}

export default function AdminAccountCreated({ email, password }: AdminAccountCreatedProps) {
  return (
    <Html>
      <Head />
      <Preview>Thông tin tài khoản quản trị của bạn</Preview>

      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white my-12 mx-auto p-8 rounded-lg shadow-md max-w-md">
            <Img src={process.env.MAIL_LOGO_URL} width={180} alt="Logo" className="mx-auto mb-12" />

            <Heading className="text-2xl font-semibold text-center text-gray-800 mt-6">
              Tài khoản quản trị đã được tạo
            </Heading>

            <Text className="text-gray-600 text-base leading-relaxed my-4 text-center">
              Super Admin đã tạo cho bạn một tài khoản quản trị hệ thống Tee Shop. Vui lòng sử dụng
              thông tin bên dưới để đăng nhập.
            </Text>

            <Section className="bg-gray-100 rounded-md p-4 my-6">
              <Text className="text-gray-700 text-sm mb-2">
                <strong>Tài khoản:</strong>
              </Text>
              <Text className="bg-white border rounded px-3 py-2 font-mono text-sm">{email}</Text>

              <Text className="text-gray-700 text-sm mt-4 mb-2">
                <strong>Mật khẩu tạm thời:</strong>
              </Text>
              <Text className="bg-white border rounded px-3 py-2 font-mono text-sm">
                {password}
              </Text>
            </Section>

            <Text className="text-gray-600 text-sm leading-relaxed text-center">
              Vì lý do bảo mật, vui lòng{' '}
              <strong>đổi mật khẩu ngay sau lần đăng nhập đầu tiên</strong>.
            </Text>

            <Section className="text-center my-6">
              <Link
                href={`${process.env.FRONTEND_URL}/login` || 'https://teeshop.io.vn/login'}
                className="inline-block bg-black text-white text-sm font-medium px-6 py-3 rounded-md no-underline"
              >
                Đăng nhập hệ thống
              </Link>
            </Section>

            <Hr className="border-gray-300 my-6" />

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
