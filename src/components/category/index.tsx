import { Text, Pressable, PressableProps } from 'react-native';
import { styles } from './styles';
import { categoriesIcons } from '@/utils/categories-icons';
import {colors} from '@/styles/theme';

type Props = PressableProps & {
    iconId: string;
    isSelected?: boolean;
    name: string;
}

export function Category({ iconId, isSelected=false, name, ...restProps }: Props) {
    const Icon = categoriesIcons[iconId];
    return (
        <Pressable style={[styles.container, isSelected && styles.containerSelected]} {...restProps}>
            <Icon color={colors.gray[isSelected ? 100 : 400]} size={16}/>
            <Text style={[styles.name, isSelected && styles.nameSelected]}>{name}</Text>
        </Pressable>
    )
}