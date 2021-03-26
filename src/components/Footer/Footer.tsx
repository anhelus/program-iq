import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = ({props}) => {

    // const { t } = props;

    return (
        <footer className="site-footer">
            <p>
                {/* &copy; {new Date().getFullYear()} RetroPedia &bull; {t("built_with")} <span role="img" aria-label="love">❤️</span> {t("credits")}. */}
            </p>
        </footer>
    )
}

// export default translate("Footer")(Footer);
export default Footer;
