import {
  Award,
  Cake,
  Coffee,
  Compass,
  Flame,
  Flower2,
  Gem,
  Heart,
  HeartHandshake,
  Home,
  MailCheck,
  Moon,
  Smile,
  Sparkles,
  Sun,
  Trophy,
} from 'lucide-react'

export function CategoryIcon({ name }: { name: string }) {
  const cls = 'h-5 w-5'
  switch (name) {
    case 'Sparkles':
      return <Sparkles className={`${cls} text-[#C8235D]`} aria-hidden="true" />
    case 'Compass':
      return <Compass className={`${cls} text-[#2E5CB8]`} aria-hidden="true" />
    case 'Flower2':
      return <Flower2 className={`${cls} text-[#D93B6B]`} aria-hidden="true" />
    case 'Award':
      return <Award className={`${cls} text-[#1E6BA8]`} aria-hidden="true" />
    case 'Cake':
      return <Cake className={`${cls} text-[#D46B08]`} aria-hidden="true" />
    case 'Gem':
      return <Gem className={`${cls} text-[#7942D6]`} aria-hidden="true" />
    case 'Heart':
      return <Heart className={`${cls} text-[#D62857]`} aria-hidden="true" />
    case 'HeartHandshake':
      return <HeartHandshake className={`${cls} text-[#C92351]`} aria-hidden="true" />
    case 'Home':
      return <Home className={`${cls} text-[#178A68]`} aria-hidden="true" />
    case 'Moon':
      return <Moon className={`${cls} text-[#5237B8]`} aria-hidden="true" />
    case 'Smile':
      return <Smile className={`${cls} text-[#6438C9]`} aria-hidden="true" />
    case 'Sun':
      return <Sun className={`${cls} text-[#D97706]`} aria-hidden="true" />
    case 'MailHeart':
      return <MailCheck className={`${cls} text-[#0F8A7B]`} aria-hidden="true" />
    case 'Trophy':
      return <Trophy className={`${cls} text-[#B7791F]`} aria-hidden="true" />
    case 'Flame':
      return <Flame className={`${cls} text-[#D94F18]`} aria-hidden="true" />
    case 'Coffee':
    default:
      return <Coffee className={`${cls} text-[#128466]`} aria-hidden="true" />
  }
}
