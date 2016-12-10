import React from 'react';

import messages from './messages';
import A from 'components/A';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';
import LocaleToggle from 'containers/LocaleToggle';

function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
      </section>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <p>
          <FormattedMessage
            {...messages.authorMessage}
            values={{
              author: <A href="https://vk.com/ilyaufo">Илья Тимофеев</A>,
            }}
          />
        </p>
      </section>
    </footer>
  );
}

export default Footer;
