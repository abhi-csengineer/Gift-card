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
  const cls = 'h-5 w-5 text-[#472C42]'
  switch (name) {
    case 'Sparkles':
      return <Sparkles className={cls} aria-hidden="true" />
    case 'Compass':
      return <Compass className={cls} aria-hidden="true" />
    case 'Flower2':
      return <Flower2 className={cls} aria-hidden="true" />
    case 'Award':
      return <Award className={cls} aria-hidden="true" />
    case 'Cake':
      return <Cake className={cls} aria-hidden="true" />
    case 'Gem':
      return <Gem className={cls} aria-hidden="true" />
    case 'Heart':
      return <Heart className={cls} aria-hidden="true" />
    case 'HeartHandshake':
      return <HeartHandshake className={cls} aria-hidden="true" />
    case 'Home':
      return <Home className={cls} aria-hidden="true" />
    case 'Moon':
      return <Moon className={cls} aria-hidden="true" />
    case 'Smile':
      return <Smile className={cls} aria-hidden="true" />
    case 'Sun':
      return <Sun className={cls} aria-hidden="true" />
    case 'MailHeart':
      return <MailCheck className={cls} aria-hidden="true" />
    case 'Trophy':
      return <Trophy className={cls} aria-hidden="true" />
    case 'Flame':
      return <Flame className={cls} aria-hidden="true" />
    case 'Coffee':
    default:
      return <Coffee className={cls} aria-hidden="true" />
  }
}
