import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, SyntheticEvent } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleProps = {
	applyArticleStyles: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ applyArticleStyles }: ArticleProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [menuOptions, setMenuOptions] =
		useState<ArticleStateType>(defaultArticleState);

	useOutsideClickClose({
		rootRef: menuRef,
		isOpen: isMenuOpen,
		onChange: setIsMenuOpen,
		onClose: () => setIsMenuOpen(false),
	});

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	const updateMenuOptions = (
		param: keyof ArticleStateType,
		value: OptionType
	) => {
		setMenuOptions((prev) => ({ ...prev, [param]: value }));
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		applyArticleStyles(menuOptions);
	};

	const handleResetOptions = () => {
		setMenuOptions(defaultArticleState);
		applyArticleStyles(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
			<aside
				ref={menuRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text
						as='h2'
						dynamic={false}
						size={31}
						weight={800}
						uppercase={true}
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={menuOptions.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder={defaultArticleState.fontFamilyOption.title}
						onChange={(selectedValue) =>
							updateMenuOptions('fontFamilyOption', selectedValue)
						}
						title='Шрифт'
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={menuOptions.fontSizeOption}
						onChange={(selectedValue) =>
							updateMenuOptions('fontSizeOption', selectedValue)
						}
						title='Размер шрифта'
					/>
					<Select
						selected={menuOptions.fontColor}
						options={fontColors}
						placeholder={defaultArticleState.fontColor.title}
						onChange={(selectedValue) =>
							updateMenuOptions('fontColor', selectedValue)
						}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={menuOptions.backgroundColor}
						options={backgroundColors}
						placeholder={defaultArticleState.backgroundColor.title}
						onChange={(selectedValue) =>
							updateMenuOptions('backgroundColor', selectedValue)
						}
						title='Цвет фона'
					/>
					<Select
						selected={menuOptions.contentWidth}
						options={contentWidthArr}
						placeholder={defaultArticleState.contentWidth.title}
						onChange={(selectedValue) =>
							updateMenuOptions('contentWidth', selectedValue)
						}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetOptions}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
