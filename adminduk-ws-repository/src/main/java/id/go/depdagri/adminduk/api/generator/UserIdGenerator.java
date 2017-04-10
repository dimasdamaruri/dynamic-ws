package id.go.depdagri.adminduk.api.generator;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserIdGenerator implements IdentifierGenerator {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyMMddHHmmss");

    public Serializable generate(SessionImplementor session, Object object)
            throws HibernateException {
        String prefix = dateFormat.format(new Date());
        Connection connection = session.connection();
        try {

            PreparedStatement ps = connection
                    .prepareStatement("SELECT COUNT(*) AS count FROM secman_m_user scmu WHERE scmu.user_id LIKE ?");

            ps.setString(1, prefix + '%');

            ResultSet rs = ps.executeQuery();
            int count = 0;
            if (rs.next()) {
                count = rs.getInt("count");
            }

            if (count == 0) {
                return prefix + paddingZero(count + 1);
            }


            while (true) {

                count++;

                PreparedStatement innerPs = connection
                        .prepareStatement("SELECT COUNT(*) AS count FROM secman_m_user scmu WHERE scmu.user_id = ?");

                String currentGeneratedId = prefix + paddingZero(count);

                innerPs.setString(1, currentGeneratedId);

                logger.info("Check Id " + currentGeneratedId);

                ResultSet innerRs = innerPs.executeQuery();
                int countInner = 0;
                if (innerRs.next()) {
                    countInner = rs.getInt("count");
                }


                if (countInner == 0) {
                    return currentGeneratedId;
                }

            }

        } catch (SQLException e) {
            logger.error(e.getMessage());
            throw new HibernateException(
                    "Unable to generate Stock Code Sequence");
        }
    }

    private String paddingZero(int count) {

        String convert = Integer.toString(count);

        if (convert.length() > 3) {
            throw new RuntimeException("Fatal Error : String Length to Long!");
        }

        int iterCount = 3 - convert.length();
        for (int i = 0; i < iterCount; i++) {
            convert = "0" + convert;
        }

        logger.info("padding " + count + " to " + convert);

        return convert;
    }
}
