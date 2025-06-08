import PwaInstallButton from '@/components/home/PwaInstallButton'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-2 p-10">
      <Button>
        <Link to="/login">로그인 바로가기</Link>
      </Button>
      <Button>
        <Link to="/me">메인 바로가기</Link>
      </Button>
      <PwaInstallButton />
    </div>
  )
}
