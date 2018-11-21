package ejb;

import java.util.Date;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.EJB;
import javax.ejb.MessageDriven;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;
import javax.jms.TextMessage;
import javax.management.relation.Role;

import fr.cpe.UserModel;
import model.DataContainer;

@MessageDriven(
        activationConfig = {
                @ActivationConfigProperty(
                        propertyName = "destinationType",
                        propertyValue = "javax.jms.Topic"),
                @ActivationConfigProperty(
                        propertyName = "destination",
                        propertyValue = "java:/jms/watcherAuthJMS")
        })
public class AuthWatcherMsgDrivenEJB implements MessageListener {
    private DataContainer dataContainer;

    public AuthWatcherMsgDrivenEJB() {
        dataContainer = new DataContainer();
    }

    public void onMessage(Message message) {

    }
}
