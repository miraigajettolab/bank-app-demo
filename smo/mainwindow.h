#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include "SystemController.h"
#include <QGraphicsScene>
#include <QMainWindow>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
    QGraphicsScene *scene;//diagram
    SystemController *controller = nullptr;
    void initStepByStepTable();
    void initStepByStepBufferTable();
    void initStepByStepSourcesTable();
    void initStepByStepProcessingDevicesTable();
    void initAutoSourcesTable();
    void initAutoProcessorTable();
    void prepareScene();//diagram
    void refreshScene();//diagram
    int currentStep = 1;//diagram
    int leftTime = 1;//diagram
    int rightTime = 10;//diagram
    float scaleX = 10;
    float scaleY = 10;


    StatisticsController::StatisticsControllerPointer statistics = StatisticsController::getInstance();
    SourceStat::SourceStatPointer sourceStats = SourceStat::getInstance();

private slots:
    void onNextStepButton();
    void onStartAutoButton();
    void onRefreshButton();//diagram
    void onSceneNextButton();//diagram
    void onSourcesCountChange(int value);
    void onProcessingCountChange(int value);
};

#endif // MAINWINDOW_H
