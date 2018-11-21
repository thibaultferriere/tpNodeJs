package ejb;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.*;

import fr.cpe.UserModel;

import java.util.function.Consumer;

@Stateless
@LocalBean
public class MessageReceiverSync implements MessageReceiverSyncLocal {

    @Inject
    JMSContext context;
    @Resource(mappedName = "java:/ProjectTopic")
    Topic topic;
    // TODO get jms context

// TODO associate queue from "java:/jms/queue/watcherqueue"

    public UserModel receiveMessage() {

        JMSConsumer consumer = context.createConsumer(topic);
// TODO create a consumer

//TODO Wait 1s incoming message (UserModel)

        int count = 0;
        while (true) {
            Message m = consumer.receive(1000);
            if (m != null) {
                if (m instanceof UserModel) {
                    System.out.println("Reading user");
                    count += 1;
                } else {
                    break;
                }
            }
        }
        System.out.println("Messages received: " + count);

        return m;
    }
}
