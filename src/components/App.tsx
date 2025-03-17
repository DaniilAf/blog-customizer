import { defaultArticleState, ArticleStateType } from 'src/constants/articleProps';
import { useState, CSSProperties } from 'react';
import './../styles/index.scss';
import styles from './../styles/index.module.scss';
import { Article } from './article/Article';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';

export const App = () => {
	const [currentStyles, setCurrentStyles] = useState<ArticleStateType>({
		...defaultArticleState,
	});

	const applyStyles = (newStyles: ArticleStateType) => {
		setCurrentStyles(newStyles);
	};

	const styleVariables = {
		'--font-family': currentStyles.fontFamilyOption.value,
		'--font-size': currentStyles.fontSizeOption.value,
		'--font-color': currentStyles.fontColor.value,
		'--container-width': currentStyles.contentWidth.value,
		'--bg-color': currentStyles.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={styles.main} style={styleVariables}>
			<ArticleParamsForm applyArticleStyles={applyStyles} />
			<Article />
		</main>
	);
};