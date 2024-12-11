import { Text, TextProps, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native'
import { styles } from './styles'
import { colors } from '@/styles/theme'
import { IconProps as TableIconProps } from '@tabler/icons-react-native'

type ButtonProps = TouchableOpacityProps & {
    isLoading?: boolean
}

function Button({ children, style, isLoading = false, ...restProps }: ButtonProps) {
    return (
        <TouchableOpacity style={[styles.container, style]} disabled={isLoading} {...restProps}>
            {isLoading ? <ActivityIndicator size='small' color={colors.gray[100]} /> : children}
        </TouchableOpacity>
    )
}

type IconProps = {
    icon: React.ComponentType<TableIconProps>
}

function Title({ children }: TextProps) {
    return (
        <Text style={styles.title}>{children}</Text>
    )
}

function Icon({ icon: Icon }: IconProps) {
    return <Icon size={24} color={colors.gray[100]} />
}

Button.Title = Title;
Button.Icon = Icon;

export { Button }