#include "mainwindow.h"
#include "ui_mainwindow.h"
#include<QDebug>
#include "SystemController.h"

#include <QTimer>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    ui->autoProgressBar->setValue(0);
    ui->autoProgressBar->setVisible(false);
    initStepByStepTable();
    initStepByStepBufferTable();
    initStepByStepProcessingDevicesTable();
    initAutoSourcesTable();
    initAutoProcessorTable();
    scene = new QGraphicsScene(this); //diagram
    ui->graphicsView->setScene(scene);//diagram
    connect(ui->nextStepButton, &QPushButton::clicked,
            this, &MainWindow::onNextStepButton);
    connect(ui->startAutoButton, &QPushButton::clicked,
            this, &MainWindow::onStartAutoButton);
    connect(ui->sourcesNumberSpinBox, SIGNAL(valueChanged(int)),
            this, SLOT(onSourcesCountChange(int)));
    connect(ui->processingNumberSpinBox, SIGNAL(valueChanged(int)),
            this, SLOT(onProcessingCountChange(int)));
    connect(ui->refreshButton, &QPushButton::clicked,//diagram
            this, &MainWindow::onRefreshButton);//diagram
    connect(ui->onSceneNextButton, &QPushButton::clicked,//diagram
            this, &MainWindow::onSceneNextButton);//diagram
    onSourcesCountChange(ui->sourcesNumberSpinBox->value());
    onProcessingCountChange(ui->processingNumberSpinBox->value());
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::initStepByStepTable()
{
    QTableWidget *table = ui->stateTableWidget;
    table->setColumnCount(3);
    table->setColumnWidth(0, 75);
    table->setColumnWidth(1, 190);
    table->setColumnWidth(2, 210);
    QStringList headerList;
    headerList << "Время" << "Действие" << "Назначенное устройство";
    table->setHorizontalHeaderLabels(headerList);
    table->setEditTriggers(QAbstractItemView::NoEditTriggers);
}

void MainWindow::initStepByStepBufferTable()
{
    QTableWidget *table = ui->bufferStateTableWidget;
    table->setColumnCount(3);
    QStringList headerList;
    headerList << "№ в буфере" << "№ источника" << "№ заявки";
    table->verticalHeader()->setVisible(false);
    table->setColumnWidth(0, 120);
    table->setColumnWidth(1, 120);
    table->setColumnWidth(2, 120);
    table->setHorizontalHeaderLabels(headerList);
    table->setEditTriggers(QAbstractItemView::NoEditTriggers);
}

void MainWindow::initStepByStepProcessingDevicesTable()
{
    QTableWidget *table = ui->processingStateTableWidget;
    table->setColumnCount(4);
    QStringList headerList;
    headerList << "№" << "Состояние" << "Время начала" << "№ заявки";
    table->verticalHeader()->setVisible(false);
    table->setColumnWidth(0, 80);
    table->setColumnWidth(1, 120);
    table->setColumnWidth(2, 140);
    table->setColumnWidth(3, 120);
    table->setHorizontalHeaderLabels(headerList);
    table->setEditTriggers(QAbstractItemView::NoEditTriggers);
}

void MainWindow::initAutoSourcesTable()
{
    QTableWidget *table = ui->generatorStatTableWidget;
    table->setColumnCount(6);
    table->setColumnWidth(0, 180);
    table->setColumnWidth(1, 180);
    table->setColumnWidth(2, 180);
    table->setColumnWidth(3, 180);
    table->setColumnWidth(4, 180);
    table->setColumnWidth(5, 220);
    QStringList headerList;
    headerList << "Количество заявок" << "Вероятность отказа" << "Время в системе"
               << "Время в буфере" << "Дисперсия буфера" << "Дисперсия обслуживания";
    table->setHorizontalHeaderLabels(headerList);
    table->setEditTriggers(QAbstractItemView::NoEditTriggers);
}

void MainWindow::initAutoProcessorTable()
{
    QTableWidget *table = ui->processorStatTableWidget;
    table->setColumnCount(1);
    table->setColumnWidth(0, 240);
    QStringList headerList;
    headerList << "Коэффициент использования" ;
    table->setHorizontalHeaderLabels(headerList);
    table->setEditTriggers(QAbstractItemView::NoEditTriggers);
}

void MainWindow::refreshScene()//diagram
{
    scene->clear();
    currentStep = 0;
    leftTime = 0;
    rightTime = 0;
}


void MainWindow::prepareScene()//diagram
{
    float xShift = -0.25;
    int lineIndex = 0;
    for (int i=0; i <statistics->getSourceDevicesCount(); i++) {
        QGraphicsTextItem *textTmp = scene->addText(("S"+std::to_string(i+1)).c_str());
        //textTmp->setX(xShift * scaleX);
        //textTmp->setY(lineIndex * scaleY);
        lineIndex++;
    }
    for (int i=0; i <statistics->getSourceDevicesCount(); i++) { //statistics->getBuffersAmount();
        QGraphicsTextItem *textTmp = scene->addText(("B"+std::to_string(i+1)).c_str());
        //textTmp->setX(xShift * scaleX);
        //textTmp->setY(lineIndex * scaleY);
        lineIndex++;
    }
    for (int i=0; i <statistics->getOperatingDevicesCount(); i++) {
        QGraphicsTextItem *textTmp = scene->addText(("D"+std::to_string(i+1)).c_str());
        //textTmp->setX(xShift * scaleX);
        //textTmp->setY(lineIndex * scaleY);
        lineIndex++;
    }
    QGraphicsTextItem *cancel = scene->addText("Reject:");
    //cancel->setX(xShift * scaleX);
    //cancel->setY(lineIndex * scaleY);

}

void MainWindow::onRefreshButton()//diagram
{
    refreshScene();
    prepareScene();
}

void MainWindow::onSceneNextButton()
{
    /*
    if (statistics->getSteps().size() <= 0)
        return;
    if (currentStep + 1 >= statistics->getSteps().size())
        return;
    if (currentStep < 0){
        currentStep++;
        return;
    }
*/

    QBrush whiteBrush(Qt::white);
    QPen blackPen(Qt::black);
    blackPen.setWidth(2);

/*
    std::multiset<std::shared_ptr<OperatingDevice>, OperatingDevice::MyCompare> *operatingDevicesList
            = controller->getOperatingDevices();
    for (auto myIter = operatingDevicesList->begin(); myIter != operatingDevicesList->end(); myIter++) {
        qInfo() << "#" << (*myIter)->getDeviceNumber() << "-" << (*myIter)->isAvaliable();
    }
*/



        /*for (auto item : stepModel.data) {
            if (item.first == i) {
                scene->addLine(
                            QLineF(rightTime * scaleX, i * scaleY, rightTime * scaleX, i * scaleY - dashHeight),
                            blackPen
                            );
                QGraphicsTextItem *textTmp = scene->addText(item.second.c_str());
                textTmp->setX(rightTime * scaleX);
                textTmp->setY(i * scaleY);
            }
        }*/

}


void MainWindow::onNextStepButton()
{
    QBrush whiteBrush(Qt::white);
    QPen blackPen(Qt::black);
    blackPen.setWidth(2);
    QPen redPen(Qt::red);
    redPen.setWidth(1);

    ui->firstLevelTabs->setTabEnabled(0, false);
    if (controller == nullptr) {
        controller = new SystemController(ui->poissonSpinBox->value(), ui->normMinSpinBox->value(),
                                          ui->normMaxSpinBox->value(), ui->bufferSizeSpinBox->value(),
                                          ui->totalTasksRequired->value());
    }
    std::multiset<SystemEvent> *eventList = controller->goToNextState();
    std::multiset<std::shared_ptr<OperatingDevice>, OperatingDevice::MyCompare> *operatingDevicesList
            = controller->getOperatingDevices();
    int i = 0;

    //my shit code
    leftTime = 0;
    rightTime = (*eventList->rbegin()).getEventTime();//stepModel.currentTime;

    int sourceC = statistics->getSourceDevicesCount();
    int bufferC = ui->bufferSizeSpinBox->value();
    int deviceC = statistics->getOperatingDevicesCount();

    qInfo() << sourceC << bufferC << deviceC;

    for (int i=0; i < sourceC; i++) { //Source lines
        scene->addLine(
            QLineF(leftTime * scaleX, i * scaleY, rightTime * scaleX, i * scaleY),
            blackPen
        );

    }

    for (int i=sourceC+1; i < sourceC+bufferC+1; i++) { //Buffer lines
        scene->addLine(
            QLineF(leftTime * scaleX, i * scaleY, rightTime * scaleX, i * scaleY),
            blackPen
        );

    }

    for (int i=sourceC+bufferC+2; i < sourceC+bufferC+deviceC+2; i++) { //Device lines
        scene->addLine(
            QLineF(leftTime * scaleX, i * scaleY, rightTime * scaleX, i * scaleY),
            blackPen
        );

    }
    //end of shit code


    QTableWidget *stateTable = ui->stateTableWidget;
    QTableWidget *processingStateTable = ui->processingStateTableWidget;
    QTableWidget *bufferStateTable = ui->bufferStateTableWidget;

    stateTable->setRowCount(eventList->size());
    for (SystemEvent event: *eventList) {

        stateTable->setItem(i, 0, new QTableWidgetItem(QString::number(event.getEventTime())));
        int offset; //to know where to start drawing
        switch (event.getEventType()) {
        case GenerateTask:
            offset = 0;
            stateTable->setItem(i, 1, new QTableWidgetItem("Создать задачу"));
            scene->addLine(
                QLineF((leftTime + event.getEventTime()) * scaleX,
                       (event.getAssignedDevice()+ offset) * scaleY,
                       (leftTime + event.getEventTime()) * scaleX,
                       (event.getAssignedDevice()+ offset) * scaleY - 6),
                       blackPen
             );
            break;
        case TaskUnbuffer:
            offset = sourceC+1;
            stateTable->setItem(i, 1, new QTableWidgetItem("Снять с буффера"));
            scene->addLine(
                QLineF((leftTime + event.getEventTime()) * scaleX,
                       (event.getAssignedDevice()+ offset) * scaleY,
                       (leftTime + event.getEventTime()) * scaleX,
                       (event.getAssignedDevice()+ offset) * scaleY - 6),
                       redPen
             );
            break;
        case TaskCompleted:
            stateTable->setItem(i, 1, new QTableWidgetItem("Окончить задачу"));
            break;
        case TaskBuffer:
            offset = sourceC+1;
            stateTable->setItem(i, 1, new QTableWidgetItem("Поместить в буффер"));
            scene->addLine(
                QLineF((leftTime + event.getEventTime()) * scaleX,
                       (event.getAssignedDevice()+ offset) * scaleY,
                       (leftTime + event.getEventTime()) * scaleX,
                       (event.getAssignedDevice()+ offset) * scaleY - 6),
                       blackPen
             );
            break;
        case TaskStarted:
            stateTable->setItem(i, 1, new QTableWidgetItem("Начать задачу"));
            break;
        case TaskRejected:
            stateTable->setItem(i, 1, new QTableWidgetItem("Отказ"));
            break;
        }
        stateTable->setItem(i, 2, new QTableWidgetItem(QString::number(event.getAssignedDevice())));
        i++;
    }

    i = 0;
    processingStateTable->setRowCount(operatingDevicesList->size());
    for (auto myIter = operatingDevicesList->begin(); myIter != operatingDevicesList->end(); myIter++) {
        processingStateTable->setItem(i, 0, new QTableWidgetItem(QString::number((*myIter)->getDeviceNumber())));
        if((*myIter)->isAvaliable()) {
            processingStateTable->setItem(i, 1, new QTableWidgetItem("Свободен"));
            processingStateTable->setItem(i, 3, new QTableWidgetItem(QString::fromStdString("Нет заявки")));
        } else {
            processingStateTable->setItem(i, 1, new QTableWidgetItem("Занят"));
			processingStateTable->setItem(i, 3, new QTableWidgetItem(QString::fromStdString((*myIter)->getCurrentTask()->getTaskId())));
        }
        processingStateTable->setItem(i, 2, new QTableWidgetItem(QString::number((*myIter)->getTaskStartTime())));
        i++;
    }

    i = 0;
    std::vector<MyTaskPointer> taskVector = controller->getBufferQueue()->getTaskVector();
    bufferStateTable->setRowCount(taskVector.size());
    for (auto myIter = taskVector.begin(); myIter != taskVector.end(); myIter++) {
        bufferStateTable->setItem(i, 0, new QTableWidgetItem(QString::number(i)));
        if (*myIter == nullptr) {
            bufferStateTable->setItem(i, 1, new QTableWidgetItem("Свободен"));
            bufferStateTable->setItem(i, 2, new QTableWidgetItem("Свободен"));
            i++;
            continue;
        }
        bufferStateTable->setItem(i, 1, new QTableWidgetItem(QString::number((*myIter)->getSourceNumber())));
        bufferStateTable->setItem(i, 2, new QTableWidgetItem(QString::fromStdString((*myIter)->getTaskId())));
        i++;
    }

    ui->stepProgressBar->setValue((statistics->getTotalTasksProcessed()*1.0 / ui->totalTasksRequired->value()) * 100);
    ui->autoProgressBar->setValue((statistics->getTotalTasksProcessed()*1.0 / ui->totalTasksRequired->value()) * 100);
}

void MainWindow::onStartAutoButton()
{
    ui->firstLevelTabs->setTabEnabled(0, false);
    ui->startAutoButton->setVisible(false);
    ui->autoProgressBar->setVisible(true);
    QTimer* timer = new QTimer();
    timer->setInterval(10); //Time in milliseconds
    timer->setSingleShot(false);
    connect(timer, &QTimer::timeout, this, [=](){
        //Do your stuff in here, gets called every interval time
       ui->stepProgressBar->setValue((statistics->getTotalTasksProcessed()*1.0 / ui->totalTasksRequired->value()) * 100);
       ui->autoProgressBar->setValue((statistics->getTotalTasksProcessed()*1.0 / ui->totalTasksRequired->value()) * 100);
    });

    if (controller == nullptr) {
        controller = new SystemController(ui->poissonSpinBox->value(), ui->normMinSpinBox->value(),
                                          ui->normMaxSpinBox->value(), ui->bufferSizeSpinBox->value(),
                                          ui->totalTasksRequired->value());
    }
    timer->start();
    controller->executeAutoMode();
    timer->stop();
    delete(timer);
    ui->stepProgressBar->setValue(100);
    ui->autoProgressBar->setValue(100);
    QTableWidget *generatorTable = ui->generatorStatTableWidget;
    QTableWidget *processorTable = ui->processorStatTableWidget;

    generatorTable->setRowCount(statistics->getSourceDevicesCount());
    processorTable->setRowCount(statistics->getOperatingDevicesCount());


    int i = 0;
    for (SourceStat generator: statistics->getSourceDevicesVector()) {
        long totalTasks = generator.getGeneratedTasksCount();
        generatorTable->setItem(i, 0, new QTableWidgetItem(QString::number(totalTasks)));
        generatorTable->setItem(i, 1, new QTableWidgetItem(
                                    QString::number(generator.getRejectedTasksCount() * 1.0 / totalTasks)));
        generatorTable->setItem(i, 2, new QTableWidgetItem(QString::number(generator.getTasksTotalTime() * 1.0 / totalTasks)));
        generatorTable->setItem(i, 3, new QTableWidgetItem(
                                    QString::number((generator.getBufferedTime() * 1.0) / totalTasks)));
        generatorTable->setItem(i, 4, new QTableWidgetItem(QString::number(generator.getBufferedTimeDispersion())));
        generatorTable->setItem(i, 5, new QTableWidgetItem(QString::number(generator.getTotalTimeDispersion())));
        i++;
    }
    i = 0;
    for (OperatingStat operatingDevice: statistics->getOperatingDevicesVector()) {
        processorTable->setItem(i, 0, new QTableWidgetItem(QString::number(
                                                               operatingDevice.getTotalWorkingTime() * 1.0 / controller->getCurrentTime())));
        i++;
    }
}

void MainWindow::onSourcesCountChange(int value)
{
    statistics->setSourceDevicesCount(value);
}

void MainWindow::onProcessingCountChange(int value)
{
    statistics->setOperatingDevicesCount(value);
}
