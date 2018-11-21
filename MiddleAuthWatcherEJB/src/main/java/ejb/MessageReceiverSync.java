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
    // TODO get jms context
    @Inject
    JMSContext context;


    // TODO associate queue from "java:/jms/queue/watcherqueue"
    @Resource(mappedName = "java:/ProjectTopic")
    Queue queue;

    public UserModel receiveMessage() {

        // TODO create a consumer
        JMSConsumer consumer = context.createConsumer(queue);

        //TODO Wait 1s incoming message (UserModel)
        UserModel user = null;
            Message message = consumer.receive(1000);
                if (message instanceof ObjectMessage) {
                    try {
                        ObjectMessage objectMessage = (ObjectMessage) message;
                        user = (UserModel) objectMessage.getObject();

                    } catch(JMSException e){

                        System.out.println("error try catch queue - " + e.getMessage());
                    }
                }
        return user;
    }
}
