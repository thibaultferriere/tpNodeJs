package ejb;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.*;

import fr.cpe.UserModel;

@Stateless
@LocalBean
public class MessageSender implements MessageSenderLocal {
    @Inject
    JMSContext context;
    @Resource(mappedName = "java:/ProjectTopic")
    Topic topic;

    @Override
    public void sendMessage(String message) {

        context.createProducer().send(topic, message);
    }

    public void sendMessage(UserModel user) {
        context.createProducer().send(topic, user);
    }
}